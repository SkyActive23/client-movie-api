import React from 'react';



export function UserInfo ({name, email}) {
    return (
        <>
            <h4>User Info</h4>
            <p><h6>Username:</h6> {name}</p>
            <p><h6>Email:</h6> {email}</p>
        </>
    )
}