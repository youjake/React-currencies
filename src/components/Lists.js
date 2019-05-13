import React, { Component } from 'react';

class Lists extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            currencies: [],
            base: '',
            date: '',
            counters: [
                {id:1, value:4 },
                {id:2, value:0 },
                {id:3, value:0 },
                {id:4, value:0 }
            ]
         }
    }

    componentDidMount()
    {
        console.log("List Component calling componentDidMount" )

        fetch('https://api.ratesapi.io/api/latest')
            .then(response => {
                return response.json().then(json => {
                return response.ok ? json : Promise.reject(json);
                });
            })
            .then((data) => {
                //console.log(data);
                //Create new array based on the returned Json
                var arr = [];
                 Object.entries(data.rates).map(([key,value])=>{
                    var obj = {
                        id: key,
                        value: value
                    };
                    arr.push(obj);
                    //console.log(key + ":" + value)
                    
                  })
                  
                
                  this.setState({
                    currencies: arr,
                    base: data.base,
                    date: data.date
                });
                //this is from currencies rendor
                //console.log("this is from currencies rendor");
                //console.log(this.state.currencies);
                  //This coming from the currencies
                 // console.log(arr)
                  //console.log("this coming from set state currcies")
                  //console.log(this.state.currencies)

            })
            .catch((error) => {
                this.setState({
                error: error.errorMessage,
                });
        });
    }

    

    render() { 
        const {currencies, base, date} = this.state;

        // console.log("in the render")
       // console.log(currencies)
        // console.log(this.state.counters)
        // {this.state.counters.map(item =>
        //     console.log("Hello")
        // )}

        
        // {this.state.currencies.map(item =>
        //     console.log(item)
        // )}

        return ( 
            <div>
                <h2>Base:{base} Date:{date}</h2>
             
                <table class="table table-hover table-dark">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                
                    {currencies.map(currency =>
                        <tr key={currency.id}>
                        <td>
                           
                            {currency.id}
                        </td>
                        <td>
                            {currency.id}
                        </td>
                        <td>
                            {currency.value}
                        </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
         );
    }
}
 
export default Lists;