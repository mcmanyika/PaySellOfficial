
function LayoutBlank({account, ...props}) {
  return (
    <div className="bg-gray-50 w-full">
    <div className="flex">
        <div className="flex-1">
            <div className="container">
                {props.children}
            </div>
        </div>
    </div> 
</div>  
  )
}

export default LayoutBlank