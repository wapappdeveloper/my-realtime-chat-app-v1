import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
declare var $:any;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {
  url:string = 'http://localhost:3000';
  constructor() { }

  ngOnInit() {
    //var socket = io(this.url);
    var socket = io.connect(this.url);

    var $messageForm = $('#messageForm');
    var $message = $('#message');
    var $chat = $('#chat');

    var $messageArea = $('#messageArea');
    var $userFormArea = $('#userFormArea');
    var $userForm = $('#userForm');
    var $users = $('#users');
    var $username = $('#username');

    $messageForm.submit(function(e){
        e.preventDefault();
        socket.emit('send message', $message.val());
        $message.val('');
        console.log('submit');
    });

    socket.on('new message', function(data){
        $chat.append('<div class="alert alert-info"><strong>'+data.user+'</strong>:&nbsp;'+data.msg+'</div>');
    });

    $userForm.submit(function(e){
        e.preventDefault();
        socket.emit('new user', $username.val(), function(data){
            if(data){
                $userFormArea.hide();
                $messageArea.show();
            }
        });
        $username.val('');
        console.log('submit');
    });
    
    socket.on('get users', function(data){
        var html = '';
        for(var i=0;i<data.length;i++){
            html += '<li class="list-group-item">'+data[i]+'</li>';
        }
        $users.html(html);
    });
  }
  /*<script>
    $(function(){
        var socket = io.connect();

        var $messageForm = $('#messageForm');
        var $message = $('#message');
        var $chat = $('#chat');

        var $messageArea = $('#messageArea');
        var $userFormArea = $('#userFormArea');
        var $userForm = $('#userForm');
        var $users = $('#users');
        var $username = $('#username');

        $messageForm.submit(function(e){
            e.preventDefault();
            socket.emit('send message', $message.val());
            $message.val('');
            console.log('submit');
        });

        socket.on('new message', function(data){
            $chat.append('<div class="alert alert-info"><strong>'+data.user+'</strong>:&nbsp;'+data.msg+'</div>');
        });

        $userForm.submit(function(e){
            e.preventDefault();
            socket.emit('new user', $username.val(), function(data){
                if(data){
                    $userFormArea.hide();
                    $messageArea.show();
                }
            });
            $username.val('');
            console.log('submit');
        });
        
        socket.on('get users', function(data){
            var html = '';
            for(var i=0;i<data.length;i++){
                html += '<li class="list-group-item">'+data[i]+'</li>';
            }
            $users.html(html);
        })

    });
</script>*/

}
