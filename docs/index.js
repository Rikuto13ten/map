console.log(dataList);

let map;
let markerList = [];

function initMap() {

    //マップを生成
    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: dataList[0].lat,
            lng: dataList[0].lng
        },
        zoom: 15,
    });

    //infoWindowを生成
    const infoWindow = new google.maps.InfoWindow();

    for (const data of dataList) {

        //マーカーを生成
        const marker = new google.maps.Marker({
            position: {
                lat: data.lat,
                lng: data.lng
            },
            map: map,
            title: data.name,
        });

        markerList.push(marker);

        const liTag = buildListItem(data);

        liTag.on('click', function () {
            reset();

            $(this).addClass('selected');

            map.panTo({
                lat: data.lat,
                lng: data.lng
            });

            //InfoWindowに表示するHTMLタグを作成する
            const content = buildInfoContent(data);

            infoWindow.setContent(content);
            infoWindow.open(map, marker);

            marker.setAnimation(google.maps.Animation.BOUNCE);
        });

        marker.addListener('click', function () {
            liTag.click();
        });

        $('ul').append(liTag);

    }
}



/* リストの中身を作成 */
function buildListItem(data) {
    const imgTag = $('<img>').attr('src', data.img);
    const nameTag = $('<h3>').text(data.name).addClass('name');
    const postTag = $('<p>').text(data.post).addClass('post');
    const addressTag = $('<p>').text(data.address).addClass('address');
    const aTag = $('<a target="_blank">').attr('href',data.url).text('サイトへ').addClass('url');
    const liTag = $('<li>').append(imgTag).append(nameTag).append(postTag).append(addressTag).append(aTag);
    return liTag;
};



function buildInfoContent (data){
    const nameTag = $('<h3>').text(data.name).addClass('name');
    const postTag = $('<p>').text(data.post).addClass('post');
    const addressTag = $('<p>').text(data.address).addClass('address');
    const divTag = $('<div>').append(nameTag).append(postTag).append(addressTag);
    return divTag[0];
}



function reset() {
    $('li').removeClass('selected');
    for (const mark of markerList) {
        mark.setAnimation(null);
    }
};