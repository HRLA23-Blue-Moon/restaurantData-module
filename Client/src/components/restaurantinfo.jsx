import React from 'react';
import axios from 'axios';

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
        console.log('hours are: ', this.state.hours);
    }

    renderHours(){
        if (this.state.hours[this.state.date])
        {
            return (
                <div>
                    Today <b>{this.state.hours[this.state.date].start} - {this.state.hours[this.state.date].end}</b><br />
                    <div id="closed"><b>{this.state.isOpen}</b></div>
                </div>
            )
        }
        else{
            return (
                <div>
                    None
                </div>
            )
        }
    }

    renderAllHours(){
        if (this.state.hours[0] && this.state.hours[1] && this.state.hours[2] && this.state.hours[3] && this.state.hours[4] && this.state.hours[5] && this.state.hours[6])
        {
            console.log('hours are: ', this.state.hours[0].start,this.state.hours[0].end);
            return (
                <div>
                    <table id="hoursTable"> <tbody>
                        <tr><td><b>Mon</b></td><td>{this.state.hours[0].start} - {this.state.hours[0].end}</td></tr>
                        <tr><td><b>Tue</b></td><td>{this.state.hours[1].start} - {this.state.hours[1].end}</td></tr>
                        <tr><td><b>Wed</b></td><td>{this.state.hours[2].start} - {this.state.hours[2].end}</td></tr>
                        <tr><td><b>Thu</b></td><td>{this.state.hours[3].start} - {this.state.hours[3].end}</td></tr>
                        <tr><td><b>Fri</b></td><td>{this.state.hours[4].start} - {this.state.hours[4].end}</td></tr>
                        <tr><td><b>Sat</b></td><td>{this.state.hours[5].start} - {this.state.hours[5].end}</td></tr>
                        <tr><td><b>Sun</b></td><td>{this.state.hours[6].start} - {this.state.hours[6].end}</td></tr>
                    </tbody> </table>
                </div>
            )
        }
        else 
        {
            return(
                <div>
                    <table id="hoursTable">
                        <tr><td><b>Mon     </b></td><td>closed</td></tr>
                        <tr><td><b>Tue</b></td><td>closed</td></tr>
                        <tr><td><b>Wed</b></td><td>closed</td></tr>
                        <tr><td><b>Thu</b></td><td>closed</td></tr>
                        <tr><td><b>Fri</b></td><td>closed</td></tr>
                        <tr><td><b>Sat</b></td><td>closed</td></tr>
                        <tr><td><b>Sun</b></td><td>closed</td></tr>
                    </table>
                </div> 
            )
        }  
    }

    renderInfo(){
        console.log(this.state.restaurant.more_info);
        if (this.state.restaurant.more_info){
            return (
                <table><tbody>
                    {this.state.restaurant.more_info.map(item => 
                        <tr>
                            <td id="infoTable">
                                {item[Object.keys(item)[1]].replace(/_/g, ' ')}  
                                <b>  {item[Object.keys(item)[2]]}</b>
                            </td>
                        </tr>
                    )}
                </tbody></table>
            )
        }
    }

    renderPrice () {
        let money = "$$$$";
        return(
            <div><b><span id="money">{this.state.restaurant.price}</span><span id="ghost">{money.substring(this.state.restaurant.price.length)}</span></b></div>
        )
    }

    componentWillMount(){

        axios
            .get('api/restaurantList', {params: {restaurant: 'Gary Danko'}})
            .then(result => {
                console.log(result.data);
                this.setState({
                    restaurant: result.data[0],
                });
                console.log('tada', this.state.restaurant.hours.open[0].start);
                this.getDate();
                this.showHours();
            })
            .catch(err => {console.log('nononono'); console.error(err);})

    }

    ComponentDidMount(){
    }

    render(){
        return (
            <div>
                <div>
                    <table id="previewTable"><tbody>
                        <tr>
                            <td><img src="https://crec.unl.edu/images/Icons/buttons_FIT_Clock.png" width="24" height="24"/> </td>
                            <td id="previewTableUnderline">{this.renderHours()}</td>
                        </tr>
                        <tr>
                            <td><img src="https://d30y9cdsu7xlg0.cloudfront.net/png/689843-200.png" width="24" height="24"/> </td>
                            <td id="previewTableUnderline"><a href={this.state.restaurant.menu}><b>Full Menu</b></a></td> 
                        </tr>
                        <tr>
                            <td align="center">{this.renderPrice()}</td>
                            <td>Price range <b>{this.state.restaurant.price_range}</b></td>
                        </tr>
                    </tbody></table>
                </div>
                <br />
                <div>
                    <h3>Hours</h3>
                    {this.renderAllHours()}
                    <a href=""><img src="https://www.shareicon.net/download/2017/01/17/872771_edit_512x512.png" width="24" height="24"/>Edit business info</a>
                    <br />
                    <br />
                    <h3>More business info</h3>
                    {this.renderInfo()}
                    <div>
                    </div>
                </div>
            </div>
        ) 
    }
}

export default RestaurantInfo;