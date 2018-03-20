class Toggle extends React.Component{

  constructor(props)
  {
    super(props);

    this.onToggle = this.onToggle.bind(this);

    this.state = {
      visibility: false,
    }
  }

  render()
  {
    return (
      <div>
        <h1>Visibility Toggle</h1>
         <br />
        <button onClick={this.onToggle}>{this.state.visibility ? "Hide Toggle" : "Show toggle"}</button>
        {this.state.visibility && (
          <p>Lorem Ipsum dolor ter.</p>
          )
        }
      </div>

    );
  }

  onToggle()
  {
    this.setState((prevState) => {
      return {
        visibility: !prevState.visibility
      }
    });
  }

}

ReactDOM.render(<Toggle />, document.getElementById('app'));
// console.log('visibility');

// let visibility = false;

// const onToggle = () => {
//   visibility = !visibility;
//   console.log(visibility);
//   rendertemplate();
// }

// const appRoot = document.getElementById('app');

// const rendertemplate = () => {
//   const template = (
//     <div>
//       <h1> Visibility Toggle </h1>
//       <br />
//       <button onClick={onToggle}>{visibility ? "Hide Toggle" : "Show toggle"}</button>
//       {visibility && (
//         <p>Lorem Ipsum dolor ter.</p>
//         )
//       }
//     </div>
//   );
//   ReactDOM.render(template, appRoot);
// }

// rendertemplate();
