/*
 * SPDX-License-Identifier: Apache-2.0
 */

package main

import (
	"encoding/json"
	"strings"
	"testing"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	"gotest.tools/assert"
)

// Test for init function
func TestInit(t *testing.T) { //

	// Arrange
	cc := new(Chaincode)
	stub := shim.NewMockStub("chaincode", cc)

	// Act
	res := stub.MockInit(
		"1",
		[][]byte{
			[]byte("initFunc")},
	)

	// Assert
	assert.Equal(t, shim.OK, int(res.Status))
}

// Test for invalid initMovie function, will return status 500
func Test_InvalidInitMovie(t *testing.T) {

	// Arrange
	cc := new(Chaincode)
	stub := shim.NewMockStub("mockstub", cc)

	// ACT
	res := stub.MockInvoke(
		"1",
		[][]byte{
			[]byte("initMovie"),
			[]byte("1")},
	)

	// Assert
	assert.Equal(t, shim.ERROR, int(res.Status))
}

// Test for Valid initMovie function, will return status 200
func Test_ValidInitMovie(t *testing.T) {

	// Arrange
	cc := new(Chaincode)
	stub := shim.NewMockStub("mockstub", cc)

	// ACT
	res := stub.MockInvoke(
		"1",
		[][]byte{
			[]byte("initMovie"),
			[]byte("ABC"),
			[]byte("Test"),
			[]byte("4"),
			[]byte("3-6"),
			[]byte("1"),
			[]byte("400"),
			[]byte("100"),
		},
	)

	// Assert
	assert.Equal(t, shim.OK, int(res.Status))
}

// Test for initCafeteria function
func Test_InitCafeteria(t *testing.T) {

	// Arrange
	cc := new(Chaincode)
	stub := shim.NewMockStub("chaincode", cc)

	// Act
	res := stub.MockInvoke("1", [][]byte{[]byte("initCafeteria"),
		[]byte("ABC"),
		[]byte("200"),
	})

	// Assert
	assert.Equal(t, shim.OK, int(res.Status))
}

// Test for bookMovie function
func Test_BookMovie(t *testing.T) {

	// Arrange
	cc := new(Chaincode)
	stub := shim.NewMockStub("chaincode", cc)
	m := movie{}
	m.MovieId = "ABC"
	m.MovieName = "Test"
	m.NumberOfShows = "4"
	m.Schedule = "3-6"
	m.Auditorium = "1"
	m.Price = "150"
	m.TotalSeats = "100"
	movieAsBytes, _ := json.Marshal(m)
	stub.MockTransactionStart("INITMOVIE")
	stub.PutState("ABC", movieAsBytes)

	// Act
	res := stub.MockInvoke("1", [][]byte{[]byte("bookMovie"),
		[]byte("ABC"),
		[]byte("3-6"),
		[]byte("5"),
	})

	// Assert
	assert.Equal(
		t,
		strings.Contains(string(res.Payload), "\"movieId\":\"ABC\""),
		true,
	)
	assert.Equal(t, shim.OK, int(res.Status))
}

// Test for invalid getMovieDetail function, will return status 500
func Test_InvalidGetMovieDetail(t *testing.T) {

	//Arrange
	cc := new(Chaincode)
	stub := shim.NewMockStub("chaincode", cc)

	// Act
	res := stub.MockInvoke("1", [][]byte{[]byte("getMovieDetails"),
		[]byte("ABC"),
	})

	// Assert
	assert.Equal(t, shim.ERROR, int(res.Status))
}

// Test for Valid getMovieDetail function
func Test_ValidGetMovieDetail(t *testing.T) {

	//Arrange
	cc := new(Chaincode)
	stub := shim.NewMockStub("chaincode", cc)
	m := movie{}
	m.MovieId = "ABC"
	m.MovieName = "Test"
	m.NumberOfShows = "4"
	m.Schedule = "3-6"
	m.Auditorium = "1"
	m.Price = "150"
	m.TotalSeats = "100"
	movieAsBytes, _ := json.Marshal(m)
	stub.MockTransactionStart("INITMOVIE")
	stub.PutState("ABC", movieAsBytes)

	// Act
	res := stub.MockInvoke("1", [][]byte{[]byte("getMovieDetails"),
		[]byte("ABC"),
	})

	// Assert
	assert.Equal(t, shim.OK, int(res.Status))
}

// Test for Invalid getTicketDetail function, will return status 500
func Test_InvalidGetTicketDetail(t *testing.T) {

	// Arrange
	cc := new(Chaincode)
	stub := shim.NewMockStub("chaincode", cc)

	// Act
	res := stub.MockInvoke("1", [][]byte{[]byte("getTicketDetails"),
		[]byte("ABC"),
	})

	// Assert
	assert.Equal(t, shim.ERROR, int(res.Status))
}

// Test for getTicketDetail function
func Test_ValidGetTicketDetail(t *testing.T) {

	// Arrange
	cc := new(Chaincode)
	stub := shim.NewMockStub("chaincode", cc)
	ticket := ticket{}
	ticket.TicketId = "0987654321"
	ticket.MovieId = "ABC"
	ticket.Movie = "Test"
	ticket.Schedule = "3-6"
	ticket.Auditorium = "1"
	ticket.Seats = 4
	ticket.TotalAmount = "600"
	ticket.Water = "true"
	ticket.Popcorn = "true"
	ticket.Soda = "true"
	ticketAsBytes, _ := json.Marshal(ticket)
	stub.MockTransactionStart("GETTICKETDETAILS")
	stub.PutState("0987654321", ticketAsBytes)

	// Act
	res := stub.MockInvoke(
		"1",
		[][]byte{
			[]byte("getTicketDetails"),
			[]byte("0987654321"),
		})

	// Assert
	assert.Equal(t, shim.OK, int(res.Status))
}

// Test for invalid exchangeWaterWithSoda function, will return status 500
func Test_InvalidExchangeWaterWithSoda(t *testing.T) {

	// Arrange
	cc := new(Chaincode)
	stub := shim.NewMockStub("chaincode", cc)

	// Act
	res := stub.MockInvoke("1", [][]byte{[]byte("exchangeWaterWithSoda"),
		[]byte("ABC"),
		[]byte("Test"),
	})

	// Assert
	assert.Equal(t, shim.ERROR, int(res.Status))
}

// Test for valid exchangeWaterWithSoda function.
func Test_ValidExchangeWaterWithSoda(t *testing.T) {

	// Arrange
	cc := new(Chaincode)
	stub := shim.NewMockStub("chaincode", cc)
	ticket := ticket{}
	ticket.TicketId = "0987654321"
	ticket.MovieId = "ABC"
	ticket.Movie = "Test"
	ticket.Schedule = "3-6"
	ticket.Auditorium = "1"
	ticket.Seats = 4
	ticket.TotalAmount = "600"
	ticket.Water = "true"
	ticket.Popcorn = "true"
	ticket.Soda = "false"
	ticketAsBytes, _ := json.Marshal(ticket)
	stub.MockTransactionStart("GETTICKETDETAILS")
	stub.PutState("0987654321", ticketAsBytes)

	cafe := Cafeteria{}
	cafe.CafeId = "XYZ"
	cafe.Soda = "200"
	cafeAsBytes, _ := json.Marshal(cafe)
	stub.MockTransactionStart("GETCAFE")
	stub.PutState("XYZ", cafeAsBytes)

	// Act
	res := stub.MockInvoke("1", [][]byte{[]byte("exchangeWaterWithSoda"),
		[]byte("XYZ"),
		[]byte("0987654321"),
	})

	// Assert
	assert.Equal(
		t,
		strings.Contains(string(res.Payload), "\"soda\":\"199\""),
		true,
	)

	assert.Equal(t, shim.OK, int(res.Status))
}
