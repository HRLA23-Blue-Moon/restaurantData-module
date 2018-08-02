import React from 'react';
import Styled from 'styled-components';

const Td = Styled.td`
    padding-right: 10px;
`;

class Hours extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            hours: props.hours,
            days: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
        }
    }

    //makes sure this component's props get updated
    componentWillReceiveProps(nextProps) {
        this.setState({ 
            hours: nextProps.hours,
        });  
    }

    renderAllHours(){
        if (this.state.hours[0] && this.state.hours[1] && this.state.hours[2] && this.state.hours[3] && this.state.hours[4] && this.state.hours[5] && this.state.hours[6])
        {
            return (
                <div>
                    <table id="hoursTable"> <tbody>
                        {this.state.days.map((day, index) => {
                            return (
                                <tr key={index}><Td><b>{day}</b></Td><Td>{this.state.hours[index].start} - {this.state.hours[index].end}</Td></tr>
                            )
                        })}
                    </tbody> </table>
                </div>
            )
        } else {
            return(
                <div>
                    <table id="hoursTable"><tbody>
                        {this.state.days.map((day, index) => {
                            return (
                                <tr key={index}><Td><b>{day}</b></Td><Td>closed</Td></tr>
                            )
                        })}
                    </tbody></table>
                </div> 
            )
        }  
    }
    

    render () {
        return (
            <div>
                <h3>Hours</h3>
                {this.renderAllHours()}
                <a href=""><img src="https://www.shareicon.net/download/2017/01/17/872771_edit_512x512.png" width="24" height="24"/>Edit business info</a>
            </div>
        )
    }
}

module.exports = Hours;