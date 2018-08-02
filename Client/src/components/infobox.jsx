import React from 'react';
import Styled from 'styled-components';


const PreviewTable = Styled.table`
    border-radius: 5px;
    border: 1px solid #e6e6e6;
    padding: 10px;
    border-spacing: 5px;
`;

const TableUnderline = Styled.td`
    border-bottom: 1px solid #e6e6e6;
`;

const ClosedText = Styled.span`
    font-size: 12px;
    color: #d32323;
    padding-top: 5px;
    padding-bottom: 5px;
`;

const Money = Styled.span`
    color: #41a700;
`

const Ghost = Styled.span`
    color: #999999;
`


class InfoBox extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            date: props.date,
            isOpen: props.isOpen,
            hours: props.hours,
            restaurant: props.restaurant,
        }
    }

    //makes sure this component's props get updated
    componentWillReceiveProps(nextProps) {
        this.setState({ 
            date: nextProps.date,
            isOpen: nextProps.isOpen,
            hours: nextProps.hours,
            restaurant: nextProps.restaurant,
        });  
    }

    renderHours(){
        if (this.state.hours[this.state.date])
        {
            return (
                <span>
                    Today <b>{this.state.hours[this.state.date].start} - {this.state.hours[this.state.date].end}</b><br />
                    <ClosedText><b>{this.state.isOpen}</b></ClosedText>
                </span>
            )
        }
        else {
            return (
                <span>None</span>
            )
        }
    }

    renderPrice () {
        let money = "$$$$";
        return(
            <div><b>
                <Money>{this.state.restaurant.price}</Money>
                <Ghost>{money.substring(this.state.restaurant.price.length)}</Ghost>
            </b></div>
        )
    }

    render () {
        return (
            <div>
                    <PreviewTable><tbody>
                        <tr>
                            <td><img src="https://crec.unl.edu/images/Icons/buttons_FIT_Clock.png" width="24" height="24"/> </td>
                            <TableUnderline>{this.renderHours()}</TableUnderline>
                        </tr>
                        <tr>
                            <td><img src="https://d30y9cdsu7xlg0.cloudfront.net/png/689843-200.png" width="24" height="24"/> </td>
                            <TableUnderline><a href={this.state.restaurant.menu}><b>Full Menu</b></a></TableUnderline> 
                        </tr>
                        <tr>
                            <td align="center">{this.renderPrice()}</td>
                            <td>Price range <b>{this.state.restaurant.price_range}</b></td>
                        </tr>
                    </tbody></PreviewTable>
            </div>
        )
    }
}

module.exports = InfoBox;