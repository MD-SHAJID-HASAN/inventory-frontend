
import { Link } from 'react-router-dom'

function ProductCategoryCard({cat} : any) {

    console.log(cat)
  return (
    <div>
        <div className='border p-2 flex flex-col gap-3'>
            <Link to={`/shops/cat/${cat.id}`}>{cat.category}</Link>
        </div>
    </div>
  )
}

export default ProductCategoryCard