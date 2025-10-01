


const createUser = () => {
    const fullName = document.getElementById("fullName").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value


    fetch("http://localhost:3000/createuser", {
        method: "POST",
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify({
            fullName: fullName,
            email: email,
            password: password,
        })
    }).then(res => res.json())
        .then(data => {
            console.log("Server Response:", data);
            alert(data.message)
        })
        .catch(error => {
            console.error("Error:", error);
            alert(error.message)
        });



    document.getElementById("fullName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";

    getUser()
}

window.createUser = createUser;




const getUser = () => {
    const getAllUser = document.getElementById("get-users")
    let row = "";

    fetch("http://localhost:3000/getAllUser")
        .then(res => {
            if (!res.ok) {
                throw new Error(`Server Error: ${res.status} (No User Found. Please create user First and Refresh)`);
            }
            return res.json();
        })
        .then(users => {
            console.log("users", users)
            console.log(users.message);

            if (!users || users.length === 0) {
                getAllUser.innerHTML = `<p>No User Found. Please create first.</p>`;
                return;
            }


            users.forEach(user => {

                row += `
        <tr>
            <td>${user.fullName}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
        </tr>
        `
            });

            getAllUser.innerHTML = `
           <h2>Get All Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                    ${row}
                </tbody>
            </table>`



        })



        .catch(error => {
            console.error("Error fetching users:", error);
            getAllUser.innerHTML = `<p style="color:red;">Failed to load users: ${error.message}</p>`;
        });
}

getUser()