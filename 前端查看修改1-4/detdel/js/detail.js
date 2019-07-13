require(['./config'], function() {
    require(['mui', 'parmas'], function(mui, obj) {
        var id = obj.id || '';
        console.log(id)
        if (id) {
            mui.ajax('/api/detail', {
                dataType: 'json',
                data: { id: id },
                type: 'get',
                success: function(data) {

                    if (data.mes[0]._id) {
                        render();
                        title.innerHTML = '修改资料'
                    }

                    function render() {
                        document.querySelector('.name').value = data.mes[0].name;
                        document.querySelector('.age').value = data.mes[0].age;
                        document.querySelector('.address').value = data.mes[0].address;
                        document.querySelector('.phone').value = data.mes[0].phone;
                        document.querySelector('.card').value = data.mes[0].card;
                    }
                }
            })
        }

        sure.addEventListener('click', function() {
            var parmas = {
                name: document.querySelector('.name').value,
                age: document.querySelector('.age').value,
                phone: document.querySelector('.address').value,
                address: document.querySelector('.phone').value,
                card: document.querySelector('.card').value
            }
            if (id) {
                parmas.id = id;
            }
            mui.ajax('/api/add', {
                dataType: 'json',
                data: parmas,
                type: 'post',
                success: function(data) {
                    console.log(data)
                    location.href = 'index.html';
                }
            })

        })

    })

})