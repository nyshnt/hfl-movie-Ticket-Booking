/*
 * SPDX-License-Identifier: Apache-2.0
 */

package main

import (
	"encoding/json"
	"fmt"
	"strconv"
	"strings"

	"github.com/google/uuid"
	"github.com/hyperledger/fabric/core/chaincode/shim"
	sc "github.com/hyperledger/fabric/protos/peer"
)

// Chaincode is the definition of the chaincode structure.
type Chaincode struct {
}

type Cafeteria struct {
	CafeId string `json:"cafeId"`
	Soda   string `json:"soda"`
}

type movie struct {
	MovieId       string `json:"movieId"`
	MovieName     string `json:"movieName"`
	NumberOfShows string `json:"shows"`
	Schedule      string `json:"schedule"`
	Auditorium    string `json:"auditorium"`
	Price         string `json:"price"`
	TotalSeats    string `json:"totalSeats"`
}

type ticket struct {
	TicketId    string `json:"ticketId"`
	MovieId     string `json:"movieId"`
	Movie       string `json:"movie"`
	Schedule    string `json:"schedule"`
	Auditorium  string `json:"audi"`
	Seats       int    `json:"seats"`
	TotalAmount string `json:"totalAmount"`
	Water       string `json:"water"`
	Popcorn     string `json:"popcorn"`
	Soda        string `json:"soda"`
}

// Init is called when the chaincode is instantiated by the blockchain network.
func (cc *Chaincode) Init(stub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

// Invoke is called as a result of an application request to run the chaincode.
func (cc *Chaincode) Invoke(stub shim.ChaincodeStubInterface) sc.Response {
	fcn, params := stub.GetFunctionAndParameters()
	fmt.Println("Invoke is running", fcn, params)

	if fcn == "initMovie" {
		return cc.initMovie(stub, params)
	} else if fcn == "initCafeteria" {
		return cc.initCafeteria(stub, params)
	} else if fcn == "bookMovie" {
		return cc.bookMovie(stub, params)
	} else if fcn == "getMovieDetails" {
		return cc.getMovieDetails(stub, params)
	} else if fcn == "getTicketDetails" {
		return cc.getTicketDetails(stub, params)
	} else if fcn == "exchangeWaterWithSoda" {
		return cc.exchangeWaterWithSoda(stub, params)
	}

	fmt.Println("invoke did not find func: " + fcn) //error
	return shim.Error("Received unknown function invocation")
}

func (cc *Chaincode) initMovie(stub shim.ChaincodeStubInterface, args []string) sc.Response {
	var err error

	// ==== Initial test for arguments ====
	if len(args) != 7 {
		return shim.Error("Incorrect number of arguments. Expecting 7")
	}

	// ==== Input Movie Details ====
	if len(args[0]) <= 0 {
		return shim.Error("1st argument must be a non-empty string")
	}
	if len(args[1]) <= 0 {
		return shim.Error("2nd argument must be a non-empty string")
	}
	if len(args[2]) <= 0 {
		return shim.Error("3rd argument must be a non-empty string")
	}
	if len(args[3]) <= 0 {
		return shim.Error("4th argument must be a non-empty string")
	}
	if len(args[4]) <= 0 {
		return shim.Error("5th argument must be a non-empty string")
	}
	if len(args[5]) <= 0 {
		return shim.Error("6th argument must be a non-empty string")
	}
	if len(args[6]) <= 0 {
		return shim.Error("7th argument must be a non-empty string")
	}

	movieId := args[0]
	movieName := args[1]
	numberOfShows := args[2]
	schedule := args[3]
	auditorium := args[4]
	price := args[5]
	totalSeats := args[6]

	// ==== Check if movie already exists ====
	movieAsBytes, err := stub.GetState(movieId)
	if err != nil {
		return shim.Error("Failed to get movie: " + err.Error())
	} else if movieAsBytes != nil {
		return shim.Error("This movie already exists: " + movieId)
	}

	// ==== Create Movie object and marshal to JSON ====
	movie := &movie{movieId, movieName, numberOfShows, schedule, auditorium, price, totalSeats}
	movieJSONBytes, err := json.Marshal(movie)
	if err != nil {
		return shim.Error(err.Error())
	}

	// ==== Save movie to state ====
	err = stub.PutState(movieId, movieJSONBytes)
	if err != nil {
		return shim.Error(err.Error())
	}

	return shim.Success(movieJSONBytes)
}

func (cc *Chaincode) initCafeteria(stub shim.ChaincodeStubInterface, args []string) sc.Response {
	var err error

	// ==== Initial test for arguments ====
	if len(args) != 2 {
		return shim.Error("Incorrect number of arguments. Expecting 2")
	}

	// ==== Input Cafe Details ====
	if len(args[0]) <= 0 {
		return shim.Error("1st argument must be a non-empty string")
	}
	if len(args[1]) <= 0 {
		return shim.Error("2nd argument must be a non-empty string")
	}

	cafeId := args[0]
	soda := args[1]

	cafe := &Cafeteria{cafeId, soda}
	cafeJSONBytes, err := json.Marshal(cafe)
	if err != nil {
		return shim.Error(err.Error())
	}

	// ==== Save cafe to state ====
	err = stub.PutState(cafeId, cafeJSONBytes)
	if err != nil {
		return shim.Error(err.Error())
	}

	return shim.Success(cafeJSONBytes)
}

func (cc *Chaincode) bookMovie(stub shim.ChaincodeStubInterface, args []string) sc.Response {
	var err error

	// ==== Initial test for arguments ====
	if len(args) != 3 {
		return shim.Error("Incorrect number of arguments. Expecting 3")
	}

	if len(args[0]) <= 0 {
		return shim.Error("1st argument must be a non-empty string")
	}
	if len(args[1]) <= 0 {
		return shim.Error("2nd argument must be a non-empty string")
	}
	if len(args[2]) <= 0 {
		return shim.Error("3rd argument must be a non-empty int")
	}

	s, _ := strconv.Atoi(args[2])

	movieId := args[0]
	schedule := args[1]
	seats := s

	// ==== Get Movie Status

	movieAsBytes, err := stub.GetState(movieId)
	if err != nil {
		return shim.Error("Failed to get movie: " + err.Error())
	} else if movieAsBytes != nil {
		var m movie
		err = json.Unmarshal([]byte(movieAsBytes), &m)

		t, _ := strconv.Atoi(m.TotalSeats)

		if seats > t {
			return shim.Error("Movie-show  is full")
		}

		uuidWithHyphen := uuid.New()
		uuid := strings.Replace(uuidWithHyphen.String(), "-", "", -1)

		i, _ := strconv.Atoi(m.Price)

		movieId := m.MovieId
		movie := m.MovieName
		schedule := schedule
		audi := m.Auditorium
		seats := seats
		ticketId := uuid
		totalAmount := i * seats
		water := "true"
		popcorn := "true"
		soda := "false"

		amount := strconv.Itoa(totalAmount)

		// ==== Create Ticket object and marshal to JSON ====
		ticket := &ticket{ticketId, movieId, movie, schedule, audi, seats, amount, water, popcorn, soda}
		ticketJSONBytes, err := json.Marshal(ticket)
		if err != nil {
			return shim.Error(err.Error())
		}

		totalSeats, _ := strconv.Atoi(m.TotalSeats)

		// ==== Save updated total seats ====
		m.TotalSeats = strconv.Itoa(totalSeats - seats)
		movieJSONBytes, _ := json.Marshal(m)
		err = stub.PutState(movieId, movieJSONBytes)

		// ==== Save ticket to state ====
		err = stub.PutState(ticketId, ticketJSONBytes)
		if err != nil {
			return shim.Error(err.Error())
		}
		return shim.Success(ticketJSONBytes)
	}

	return shim.Success(nil)
}

func (cc *Chaincode) getMovieDetails(stub shim.ChaincodeStubInterface, args []string) sc.Response {
	var err error

	// ==== Initial test for arguments ====
	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}
	if len(args[0]) <= 0 {
		return shim.Error("1st argument must be a non-empty string")
	}

	movieId := args[0]

	// ==== Get Movie Status ====
	movieasBytes, err := stub.GetState(movieId)
	if err != nil {
		return shim.Error("Failed to get movie: " + err.Error())
	} else if movieasBytes == nil {
		jsonResp := "{\"Error\":\"Ticket not found: " + movieId + "\"}"
		return shim.Error(jsonResp)
	}

	return shim.Success(movieasBytes)
}

func (cc *Chaincode) getTicketDetails(stub shim.ChaincodeStubInterface, args []string) sc.Response {
	var err error

	// ==== Initial test for arguments ====
	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	if len(args[0]) <= 0 {
		return shim.Error("1st argument must be a non-empty string")
	}

	ticketId := args[0]

	// ==== Get Ticket State ====
	ticketasBytes, err := stub.GetState(ticketId)
	if err != nil {
		return shim.Error("Failed to get ticket details: " + err.Error())
	} else if ticketasBytes == nil {
		jsonResp := "{\"Error\":\"Ticket not found: " + ticketId + "\"}"
		return shim.Error(jsonResp)
	}
	return shim.Success(ticketasBytes)
}

func (cc *Chaincode) exchangeWaterWithSoda(stub shim.ChaincodeStubInterface, args []string) sc.Response {

	// ==== Initial test for arguments ====
	if len(args) != 2 {
		return shim.Error("Incorrect number of arguments. Expecting 3")
	}

	if len(args[0]) <= 0 {
		return shim.Error("1st argument must be a non-empty string")
	}
	if len(args[1]) <= 0 {
		return shim.Error("2nd argument must be a non-empty string")
	}

	id := args[0]
	ticketId := args[1]

	// ==== Get Cafe State ====
	cafeasBytes, err := stub.GetState(id)
	if err != nil {
		return shim.Error("Failed to get cafe details: " + err.Error())
	}
	var c Cafeteria
	var T ticket
	err = json.Unmarshal([]byte(cafeasBytes), &c)
	t, _ := strconv.Atoi(c.Soda)

	// ==== Get ticket State ====
	ticketasBytes, err := stub.GetState(ticketId)
	if err != nil {
		return shim.Error("Failed to get ticket details: " + err.Error())
	} else if ticketasBytes == nil {
		jsonResp := "{\"Error\":\"Ticket not found: " + ticketId + "\"}"
		return shim.Error(jsonResp)
	}
	err = json.Unmarshal([]byte(ticketasBytes), &T)

	T.Soda = "true"
	T.Water = "false"
	TicketJSONBytes, _ := json.Marshal(T)

	// ==== Update Ticket details ====
	err = stub.PutState(ticketId, TicketJSONBytes)
	if err != nil {
		return shim.Error("Failed to update Ticket soda detail")
	}

	c.Soda = strconv.Itoa(t - 1)
	CafeJSONBytes, _ := json.Marshal(c)

	// ==== Update cafe details ====
	err = stub.PutState(id, CafeJSONBytes)
	if err != nil {
		return shim.Error("Failed to update number of soda")
	}

	return shim.Success(CafeJSONBytes)
}
