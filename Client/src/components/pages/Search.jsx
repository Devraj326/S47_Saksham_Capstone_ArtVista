import React from 'react'
import Navbar from '../common/Navbar'
import Footer from '../common/Footer'
import Searchcss from './Search.module.css'

function Search() {
  return (
    <>
      <Navbar />
      <br /><br /><br /><br /><br />
      <div className={`${Searchcss.fullflex}`}>
        <div  className={`${Searchcss.container}`}>
          
        <div className={`${Searchcss.searchflex}`}>
          <div className={`${Searchcss.searchflextt}`}>
            <p>Search By Title</p>
            <input type="text" />
          </div>
          <div>
            <p>Search By Author</p>
            <input type="text" />
          </div>
        {/* </div>


        <div className={`${Searchcss.searchflex}`}> */}
          <div>
            <p>Search By Date</p>
            <input type="date" />
          </div>
          <div  className={`${Searchcss.searchflextt}`}>
            <p>Search By Categories</p>
            <input type="text" />
          </div>
        </div>
        
        <button>Start Searching</button>
        </div>        
      </div>
      <Footer />
    </>
  )
}

export default Search