import TopBar from "./TopBar"
import MainHeader from "./MainHeader"
import CartDrawer from "./CartDrawer"

const Header = () => {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow">
        <TopBar />
        <MainHeader />
      </header>

      <CartDrawer />
    </>
  )
}

export default Header


// import React, { useState } from 'react';
// import TopBar from "./TopBar";
// import MainHeader from "./MainHeader";
// import CartDrawer from "./CartDrawer";

// const Header = () => {
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   return (
//     <>
//       <header className="sticky top-0 z-50">
//         <TopBar />
//         <MainHeader toggleCart={() => setIsCartOpen(true)} />
//       </header>

//       <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
//     </>
//   );
// };

// export default Header;

