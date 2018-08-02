import React from 'react';
import axios from 'axios';
import InfoBox from './infobox';
import Hours from './hours';
import MoreInfo from './moreinfo';
import Styled from 'styled-components';

const Div = Styled.div`
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
`;



class RestaurantInfo extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            date: 0,
            isOpen: '',
            hours: [
                {start: '900', end: '1700'},{start: '900', end: '1700'},{start: '900', end: '1700'},{start: '900', end: '1700'},{start: '900', end: '1700'},{start: '900', end: '1700'},{start: '900', end: '1700'},
            ],
            //have to make default states for all the data
            restaurant: {
                id: "",
                name: "",
                price_range: "",
                menu: "",
                is_closed: null,
                url: "",
                price: "",
                health_score: "",
                more_info: [],
                hours:
                  {
                    hours_type: "",
                    open: [
                      {  is_overnight: null, end: "", day: 0, start: "" },
                      {  is_overnight: null, end: "", day: 1, start: "" },
                      {  is_overnight: null, end: "", day: 2, start: "" },
                      {  is_overnight: null, end: "", day: 3, start: "" },
                      {  is_overnight: null, end: "", day: 4, start: "" },
                      {  is_overnight: null, end: "", day: 5, start: "" },
                      {  is_overnight: null, end: "", day: 6, start: "" },
                      {  is_overnight: null, end: "", day: 7, start: "" },
                    ],
                    is_open_now: null,
                  },

              }
        }
        this.getDate = this.getDate.bind(this);
        this.showHours = this.showHours.bind(this);
    }

    getDate(){
        var d = new Date();
        var n = d.getDay();
        var timeOfDay = (d.getHours() * 100) + d.getMinutes();
        if (timeOfDay > this.state.restaurant.hours.open[n].start && timeOfDay < this.state.restaurant.hours.open[n].end)
        { this.setState({isOpen: 'Open now'}); }
        else
        { this.setState({isOpen: 'Closed now'}); }

        this.setState({date: n});
    }

    showHours(){
        this.setState({hours: []});
        this.state.restaurant.hours.open.forEach(day => {
            //parse the hours
            var dayStart = day.start;
            var dayEnd = day.end;

            //accounting for single digit hours

            if (day.start % 1200 >= 1)
            {
                dayStart -= 1200;
                dayStart = dayStart.toString();

                var startH = 2;
                if (dayStart.length === 3){startH = 1}
    
                dayStart = [dayStart.slice(0,startH) + ":" + dayStart.slice(startH,startH + 2) + " pm"].join('');
            }
            else
            {
                dayStart = dayStart.toString();

                var startH = 2;
                if (dayStart.length === 3){startH = 1}
    
                dayStart = [dayStart.slice(0,startH) + ":" + dayStart.slice(startH,startH + 2) + " am"].join('');
            }

            if (day.end % 1200 >= 1)
            {
                dayEnd -= 1200;
                dayEnd = dayEnd.toString();

                var endH = 2;
                if (dayEnd.length === 3){endH = 1}
    
                dayEnd = [dayEnd.slice(0,endH) + ":" + dayEnd.slice(endH,endH + 2) + " pm"].join('');

            }
            else
            {
                dayEnd = dayEnd.toString();

                var endH = 2;
                if (dayEnd.length === 3){endH = 1}

                dayEnd = dayEnd.splice(2,0,':');
                dayEnd = [dayEnd.slice(0,2) + ":" + dayEnd.slice(2,4) + " am"].join('');
            }

            var arr = this.state.hours.concat({start: dayStart, end: dayEnd});
            this.setState({hours: arr});
        });
    }

    componentWillMount(){
        axios
            .get('api/restaurantList', {params: {restaurant: 'Gary Danko'}})
            .then(result => {
                this.setState({
                    restaurant: result.data[0],
                });
                this.getDate();
                this.showHours();
            })
            .catch(err => {console.log('nononono'); console.error(err);})
    }


    render(){
        return (
            <Div>
                <InfoBox 
                    date={this.state.date} 
                    restaurant={this.state.restaurant} 
                    hours={this.state.hours}
                    isOpen={this.state.isOpen}
                    showHours={this.showHours}
                />
                <br />
                <div>
                    <Hours 
                        hours={this.state.hours}
                    />
                    <br />
                    <br />
                    <MoreInfo 
                        restaurant={this.state.restaurant}
                    />
                    <div>
                    </div>
                </div>
            </Div>
        ) 
    }
}

export default RestaurantInfo;