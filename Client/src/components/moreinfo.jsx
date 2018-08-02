import React from 'react';
import Styled from 'styled-components';

const InfoTable = Styled.td`
    text-transform: capitalize;
    padding-bottom: 5px;
    white-space: pre;
`;

const H3 = Styled.h3`
    color: #d32323;
`;

class MoreInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            restaurant: props.restaurant,
        }
    }

    //makes sure this component's props get updated
    componentWillReceiveProps(nextProps) {
        this.setState({ 
            restaurant: nextProps.restaurant,
        });  
    }

    renderInfo(){
        if (this.state.restaurant.more_info){
            return (
                <table><tbody>
                    {this.state.restaurant.more_info.map((item, index) => 
                        <tr key={index}>
                            <InfoTable>
                                {item[Object.keys(item)[1]].replace(/_/g, ' ')}  
                                <b>  {item[Object.keys(item)[2]]}</b>
                            </InfoTable>
                        </tr>
                    )}
                </tbody></table>
            )
        }
    }

    render () {
        return (
            <div>
                <H3>More business info</H3>
                {this.renderInfo()}
            </div>
        )
    }
}

module.exports = MoreInfo;