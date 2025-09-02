
import { Link } from 'react-router-dom'

function ProductCategoryCard({cat} : any) {

    console.log(cat)
  return (
    <div>
        <div className='border p-2 flex flex-col gap-3 bg-slate-700 text-white'>
            <Link to={`/shops/cat/${cat._id}`}>{cat.name}</Link>
        </div>
    </div>
  )
}

export default ProductCategoryCard