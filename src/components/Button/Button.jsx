import css from './Button.module.css';

export const Button = ({ handleClick }) => {
  return (
    <>
      <button className={css.Button} type="button" onClick={handleClick}>
        Load more
      </button>
    </>
  );
};

// import { Component } from 'react';
// import css from './Button.module.css';

// export class Button extends Component {
//   render() {
//     return (
//       <>
//         <button
//           className={css.Button}
//           type="button"
//           onClick={this.props.handleClick}
//         >
//           Load more
//         </button>
//       </>
//     );
//   }
// }
