
var body = document.getElementById("workflow")
var username = localStorage.getItem("username")
async function notification_for_app(){
    const path = require('path');
    var obj = {"username": username}
    var document_cross = document.getElementById("cross")
    var json= JSON.stringify(obj);
    const options = {
        method: 'POST',
        body: json,
        headers: {
            'Content-Type': 'application/json', 
          }
    };
    const response = await fetch(
        'https://lawflow-3c5b7.uc.r.appspot.com/notifications/getNotifications', options);
    
    if(response.status==200){
        var val_initial = await response.json()
        for(var i =0;i<val_initial.length;i++){
    
            if(val_initial[i]["delivered"] == "false"){
                var notification = val_initial[i]["notification"]
                var title = val_initial[i]["Title"]
                var notif_id = val_initial[i]["notif_id"]
                new Notification(title, { body: notification,icon: path.join('../assets', 'lawflow_small.png'),})

                var obj = {"username": username, "notif_id":notif_id}
                var document_cross = document.getElementById("cross")
                var json= JSON.stringify(obj);
                const options = {
                    method: 'POST',
                    body: json,
                    headers: {
                        'Content-Type': 'application/json', 
                    }
                };
                const response = await fetch(
                    'https://lawflow-3c5b7.uc.r.appspot.com/notifications/changeDelivered', options);
                
            }
        }
    setInterval(async() => {
    var obj = {"username": username}
    var document_cross = document.getElementById("cross")
    var json= JSON.stringify(obj);
    const options = {
        method: 'POST',
        body: json,
        headers: {
            'Content-Type': 'application/json', 
          }
    };
    const response = await fetch(
        'https://lawflow-3c5b7.uc.r.appspot.com/notifications/getNotifications', options);
    
    if(response.status==200){
        var val_initial = await response.json()
        for(var i =0;i<val_initial.length;i++){
  
            if(val_initial[i]["delivered"] == "false"){
                var notification = val_initial[i]["notification"]
                var title = val_initial[i]["title"]
                var notif_id = val_initial[i]["notif_id"]
                new Notification(title, { body: notification,icon: path.join('../assets', 'lawflow_small.png')})

                var obj = {"username": username, "notif_id":notif_id}
                var document_cross = document.getElementById("cross")
                var json= JSON.stringify(obj);
                const options = {
                    method: 'POST',
                    body: json,
                    headers: {
                        'Content-Type': 'application/json', 
                    }
                };
                const response = await fetch(
                    'https://lawflow-3c5b7.uc.r.appspot.com/notifications/changeDelivered', options);
                
                
            }
        }
    }
    }, 60000);
    

} 
}

export {notification_for_app}