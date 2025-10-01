import express from "express"
import fs from "fs"
import cors from "cors"

const app = express()
const PORT = 3000
const temArr = []
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.post("/createuser", (request, response) => {

    // console.log(request.body);
    const fileExist = fs.existsSync("users.txt");

    if (fileExist) {
        const getUserFromFile = fs.readFileSync("users.txt", "utf-8")
        const parseUsers = JSON.parse(getUserFromFile)
        // console.log(parseUsers);

        const userExist = parseUsers.find((user) => user.email === request.body.email)

        if (userExist) {
            return response.json({
                message: "User Already Exist"
            })
        }

        parseUsers.push(request.body)
        fs.writeFileSync("users.txt", JSON.stringify(parseUsers))
        return response.json({
            message: "User Created Successfully"
        })

    } else {
        temArr.push(request.body)
        fs.writeFileSync("users.txt", JSON.stringify(temArr))
        return response.json({
            message: "User Created Successfully"
        })
    }

})


app.get("/getAllUser", (request, response) => {

    const getAllUsers = fs.readFileSync("users.txt", "utf-8")
    const pareseGetAllUsers = JSON.parse(getAllUsers)
    // console.log(pareseGetAllUsers);
    response.send(pareseGetAllUsers)

})

app.listen(PORT, () => console.log(`Server Running on 3000`))