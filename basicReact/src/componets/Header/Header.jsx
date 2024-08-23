import './Header.css'

function Header(){

  return(
    <>
    <div className="headerEle">
      <div id="header" className='logo'>
        व्यापारी Shopping
      </div>
      <div id="header" className='div2'>
        <p>Shop</p>
        <div className='verticalLine'></div>
        <form action="">
            <input placeholder='What are you looking for?' type="text" />
            <button type='submit'>Search</button>
        </form>
      </div>
      <div id="header">
      <button className='bulkReq'>Bulk Requirement</button>
      </div>

    </div>
    </>
  )

}

export default Header