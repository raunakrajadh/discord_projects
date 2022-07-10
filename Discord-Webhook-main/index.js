var button = document.getElementById('button')

button.addEventListener('click', () => {
    
    var url = document.getElementById('webhookUrl')
    var avatar_url = document.getElementById('avatarUrl')
    var username = document.getElementById('username')
    var content = document.getElementById('content')

    var request = new XMLHttpRequest();
    request.open("POST", url.value);
    request.setRequestHeader('Content-type', 'application/json');
    
    var params = {
        username: username.value,
        avatar_url: avatar_url.value,
        content: content.value,
    }

    request.send(JSON.stringify(params));
})


