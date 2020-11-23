import { Route, Switch } from 'react-router-dom';
import './App.css';
import AdminAddCafeteria from './components/Admin/AdminAddCafeteria';
import AdminAddMovie from './components/Admin/AdminAddMovie';
import Booking from './components/Booking/Booking';
import Booking2 from './components/Booking/Booking2';
// import Booking3 from './components/Booking/Booking3';
import Home from './components/Home/Home';
import GetCafeteriaDetail from './components/Admin/GetCafeteriaDetail'
import ListAllMovies from './components/Admin/ListAllMovies';
import ListAllTickets from './components/Admin/ListAllTickets';

function App() {
  return (
    <div className="main">
      <Switch>
        <Route path="/" exact strict name="Home" component={Home} />
        <Route path="/addMovie" exact strict name="AdminAddMovie" component={AdminAddMovie} />
        <Route path="/addCafeteria" exact strict name="AdminAddCafeteria" component={AdminAddCafeteria} />
        <Route path="/cafeDetails" exact strict name="AdminGetCafeteria" component={GetCafeteriaDetail} />
        <Route path="/listAllMovies" exact strict name="AdminListAllMovies" component={ListAllMovies} />
        <Route path="/listAllTickets" exact strict name="AdminListAllTickets" component={ListAllTickets} />
        <Route path="/counter1" exact strict name="Booking" component={Booking} />
        <Route path="/counter2" exact strict name="Booking2" component={Booking2} />
        <Route path="/counter3" exact strict name="Booking2" component={Booking2} />
        <Route path="/counter4" exact strict name="Booking2" component={Booking2} />
        {/* <Route path="/booking3" exact strict name="Booking3" component={Booking3} /> */}
        {/* <Route path="/addCafeteria" exact strict name="AdminAddCafeteria" component={AdminAddCafeteria} />         */}
      </Switch>
    </div>
  );
}

export default App;
