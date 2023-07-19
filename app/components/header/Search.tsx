'use client'

const Search = () => {
    return (
        <div className="top-nav-search">
            <form>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search here"
                />
                <button className="btn" type="submit">
                    <i className="fas fa-search" />
                </button>
            </form>
        </div>
    )
}

export default Search