const MenuIcon = ({ icon, isWhite }) => {
  const styleWhite = { filter: 'brightness(250%)' };
  const styleDark = { filter: 'brightness(50%)' };

  return <img src={icon} style={isWhite ? styleWhite : styleDark} />;
};

export default MenuIcon;
