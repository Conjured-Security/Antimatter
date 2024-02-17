import { authOptions } from "../../auth/[...nextauth]/route"
import { getServerSession } from "next-auth"


// Delete category
export async function DELETE(request, { params }) {
    const session = await getServerSession(authOptions)
    const accessToken = session.accessToken
    const res = await fetch(`http://backend:${process.env.ANTIMATTER_API_PORT}/api/categories/${params.categoryId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        }
    })

    const data = await res.json()
    return Response.json(data)
}