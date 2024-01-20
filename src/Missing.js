
import { Link } from 'react-router-dom'


const Missing = () => {
    return (
      <main className="Missing">
          <h2>Sorry Post is n't available</h2>
          <p>That's disappointing</p>
          <p>
              <Link to='/'>Home Page</Link>
          </p>
      </main>
    )
  }
  
  export default Missing