function PopupWithForm(props) {
  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen ? `popup_opened` : ""}`}>
      <div className={`popup__container popup__container_type_${props.name}`}>
        <h2 className={`popup__name popup__name_type_${props.name}`}>
          {props.title}
        </h2>
        <form className={`popup__form popup__form_type_${props.name}`} name="profile-form" onSubmit={props.onSubmit}>
          {props.children} 
          <button className={`popup__save popup__save_type_${props.name}`} type="submit" >
            {props.btnText}
          </button>
        </form>
        <button className="popup__close" type="button" onClick={props.onClose}/>
      </div>
    </section>
  );
}

export default PopupWithForm;
