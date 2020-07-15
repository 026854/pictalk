'use strict';

var stompClient = null;
var username = null;
var rooms = null;
var currentRoom  = null;
var chatPage = document.querySelector('#chat-page');
var messageInput = document.querySelector('#message');
var messageArea = document.querySelector('#messageArea');
var connectingElement = document.querySelector('.connecting');
var chatMenu = document.querySelector('#chat-menu');

app.controller("chatController", function ($scope, $http, $uibModal, $filter) {
    $scope.rooms = [];
    $scope.rooms = [{
        id: 1,
        type: 0,
        title: "제목",
        description: "채팅방 들어오세요~",
        category:["태그1","태그2"],
        img: "/chat/img/thumbnail_example.png",
        max: 10,
        member: 0,
        createDate: "2020.07.13",
        manager_id: 1
    },{
        id: 2,
        type: 1,
        title: "제목2",
        description: "채팅방 들어오세요~",
        category:["태그1","태그2"],
        img: "/chat/img/thumbnail_example.png",
        max: 10,
        member: 0,
        createDate: "2020.07.13",
        manager_id: 1
    },{
        id: 3,
        type: 0,
        title: "제목3",
        description: "채팅방 들어오세요~",
        category:["태그1","태그2"],
        img: "/chat/img/thumbnail_example.png",
        max: 10,
        member: 0,
        createDate: "2020.07.13",
        manager_id: 1
    },{
        id: 4,
        type: 1,
        title: "제목4",
        description: "채팅방 들어오세요~",
        category:["태그1","태그2"],
        img: "/chat/img/thumbnail_example.png",
        max: 10,
        member: 0,
        createDate: "2020.07.13",
        manager_id: 1
    },{
        id: 5,
        type: 0,
        title: "제목5",
        description: "채팅방 들어오세요~",
        category:["태그1","태그2"],
        img: "/chat/img/thumbnail_example.png",
        max: 10,
        member: 0,
        createDate: "2020.07.13",
        manager_id: 1
    },{
        id: 6,
        type: 1,
        title: "제목6",
        description: "채팅방 들어오세요~",
        category:["태그1","태그2"],
        img: "/chat/img/thumbnail_example.png",
        max: 10,
        member: 0,
        createDate: "2020.07.13",
        manager_id: 1
    },{
        id: 7,
        type: 0,
        title: "제목7",
        description: "채팅방 들어오세요~",
        category:["태그1","태그2"],
        img: "/chat/img/thumbnail_example.png",
        max: 10,
        member: 0,
        createDate: "2020.07.13",
        manager_id: 1
    },{
        id: 8,
        type: 1,
        title: "제목8",
        description: "채팅방 들어오세요~",
        category:["태그1","태그2"],
        img: "/chat/img/thumbnail_example.png",
        max: 10,
        member: 0,
        createDate: "2020.07.13",
        manager_id: 1
    }];

    $scope.initDumpData = function(){
        $scope.storage_image = [
            {
                id: 1,
                url: "/chat/img/image_example.jpg"
            },
            {
                id: 2,
                url: "/chat/img/image_example.jpg"
            },
            {
                id: 3,
                url: "/chat/img/image_example.jpg"
            },
            {
                id: 4,
                url: "/chat/img/image_example.jpg"
            },
            {
                id: 5,
                url: "/chat/img/image_example.jpg"
            },
            {
                id: 6,
                url: "/chat/img/image_example.jpg"
            }
        ]
        $scope.participants = [
            {
                id: 1,
                nickname: "팍경호",
                email: "park@naver.com",
                thumbnail: "/chat/img/thumbnail_example.png"
            },
            {
                id: 2,
                nickname: "쏭치민",
                email: "song@naver.com",
                thumbnail: "/chat/img/thumbnail_example.png"
            },
            {
                id: 3,
                nickname: "쵸지은",
                email: "choi@naver.com",
                thumbnail: "/chat/img/thumbnail_example.png"
            },
            {
                id: 4,
                nickname: "팍경호",
                email: "park@naver.com",
                thumbnail: "/chat/img/thumbnail_example.png"
            },
            {
                id: 5,
                nickname: "쏭치민",
                email: "song@naver.com",
                thumbnail: "/chat/img/thumbnail_example.png"
            },
            {
                id: 6,
                nickname: "쵸지은",
                email: "choi@naver.com",
                thumbnail: "/chat/img/thumbnail_example.png"
            },
            {
                id: 7,
                nickname: "팍경호",
                email: "park@naver.com",
                thumbnail: "/chat/img/thumbnail_example.png"
            },
            {
                id: 8,
                nickname: "쏭치민",
                email: "song@naver.com",
                thumbnail: "/chat/img/thumbnail_example.png"
            },
            {
                id: 9,
                nickname: "쵸지은",
                email: "choi@naver.com",
                thumbnail: "/chat/img/thumbnail_example.png"
            },
            {
                id: 10,
                nickname: "팍경호",
                email: "park@naver.com",
                thumbnail: "/chat/img/thumbnail_example.png"
            },
            {
                id: 11,
                nickname: "쏭치민",
                email: "song@naver.com",
                thumbnail: "/chat/img/thumbnail_example.png"
            },
            {
                id: 12,
                nickname: "쵸지은",
                email: "choi@naver.com",
                thumbnail: "/chat/img/thumbnail_example.png"
            }
        ];
        $scope.manager = $filter('filter')($scope.participants, {id: currentRoom.manager_id}, true)[0];
    }


    $scope.connect = function ($event, room) {
        connect($event, room);
        $scope.currentRoom = room;
        $scope.initDumpData();
    };

    $scope.sendMessage = function ($event) {
        sendMessage($event);
    };

    $scope.onClickToggleMenu = function () {
        var display = chatMenu.style.display;
        if(display === 'none' || display ===''){
            chatMenu.style.display = 'inline-block';
        }else{
            chatMenu.style.display = 'none';
        }
    };

    $scope.onClickExitChatRoom = function(){
        chatMenu.style.display = 'none';
        disConnect();
    }

    $scope.onClickAddChatRoom = function(){
        console.log('대화방 추가 버튼 테스트');
        var modalInstance = $uibModal.open({
            templateUrl: 'modal/modal_chat',
            controller: 'chatModalController'
        });
        modalInstance.result.then(function (selectedItem) {
            console.log("modal click ok : " + selectedItem);
        }, function () {
            console.log('modal에서 dismissed at: ' + new Date());
        });
    }
});


var colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

function connect(event, room) {
    username = Math.random().toString(36).substr(2, 5);
    if(username) {
        disConnect();
        currentRoom = room;
        chatPage.classList.remove('hidden');
        connectingElement.classList.add('hidden');
        clearChatText();
    }
    event.preventDefault();
}

function disConnect(){
    currentRoom = null;
    chatPage.classList.add('hidden');
    connectingElement.classList.remove('hidden');
}

function sendMessage(event) {
    var messageContent = messageInput.value.trim();
    var message = {
        type: 'CHAT',
        content: messageContent,
        sender: username

    };
    messageInput.value = '';

    var messageElement = document.createElement('li');
    var messageCoverElement = document.createElement('span');

    messageCoverElement.classList.add('chat-message-cover');
    messageElement.classList.add('chat-message');
    if(message.sender === username){
        messageCoverElement.classList.add('me');
        messageElement.classList.add('me');
    }
    var avatarElement = document.createElement('i');
    var avatarText = document.createTextNode(message.sender[0]);
    avatarElement.appendChild(avatarText);
    avatarElement.style['background-color'] = getAvatarColor(message.sender);

    messageCoverElement.appendChild(avatarElement);

    var usernameElement = document.createElement('span');
    var usernameText = document.createTextNode(message.sender);
    usernameElement.appendChild(usernameText);
    messageCoverElement.appendChild(usernameElement);

    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);

    messageCoverElement.appendChild(textElement);

    messageElement.appendChild(messageCoverElement);

    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
    event.preventDefault();
}


function getAvatarColor(messageSender) {
    var hash = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }
    var index = Math.abs(hash % colors.length);
    return colors[index];
}

function clearChatText() {
    $("#messageArea").empty();
}