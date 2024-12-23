import './SpecialsCard.css';

const Carousel = (props) => {
  return(
    <li className="specials">
      <div className="img-container">
        <img src={`${props.image}`} alt={props.title} />
      </div>
      <h3>{props.title}</h3>
      <h4>{props.price}</h4>
      <p>{props.description}</p>
      <button>order online</button>
    </li>
  );
};
export default Carousel;