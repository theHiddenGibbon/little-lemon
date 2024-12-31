import './SpecialsCard.css';
import PlusIcon from '../icons/circle-plus-solid.svg';

const SpecialsCard = (props) => {
  return(
    <li className="specials">
      <div className="img-container">
        <img src={`${props.image}`} alt={props.title} />
      </div>
      <h5>{props.title}</h5>
      <span className="highlight-text">{props.price}</span>
      <p>{props.description}</p>

      <div className="add-to-order">
        <span className="highlight">Add to order</span>
        <button>  
          <img src={PlusIcon} alt="+" />
        </button>
      </div>
    </li>
  );
};
export default SpecialsCard;