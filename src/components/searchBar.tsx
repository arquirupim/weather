import '../resource/css/searchBar.css'
import { ReactElement } from 'react'
import { loadingstore } from '../resource/js/store'


function SearchBar() : ReactElement{
    const [loadInit] = loadingstore((state)=> [state.loadInit])
    //임시로... 나중에 수정때 고치기
    function isChange(e : any){
        console.log(e.target.value)
        return 'a'
    }
    
    return(
        <div className='searchWrap'>
            <div className="searchBarWrap">
                <input type="text" placeholder="Input Your Address" className='searchBar' onChange={isChange}/>
                <div className='searchIconWrap' onClick={loadInit}>
                    <svg className='searchIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM288 176c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 48.8 46.5 111.6 68.6 138.6c6 7.3 16.8 7.3 22.7 0c22.1-27 68.6-89.8 68.6-138.6zm-112 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/>
                    </svg>
                </div>
            </div>
            <div className='searchResult'>
                {['a','b']}
            </div>
        </div>
    )
}


export default SearchBar