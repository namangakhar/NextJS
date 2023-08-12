

export default function UserProfile({params}: any) {
    return(
        <div>
            <p className="text-center text-white text-4xl"> Profile UserName: {params.userId} </p>
        </div>
    )
}