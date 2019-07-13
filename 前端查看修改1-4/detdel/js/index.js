	require(['./config'], function() {
	    require(['mui'], function(mui) {
	        mui.ajax('/api/list', {
	            dataType: 'json',
	            type: 'get',
	            // headers: { 'Concent-Type': 'application/json' },
	            success: function(data) {
	                var data = data.mes;
	                group.innerHTML += data.map(function(v, i) {
	                    return `<div class="mui-input-row">
					  <label>name</label>
					  <input type="text" placeholder="${v.name}">
				  <div class="mui-button-row">
								  <button type="button" class="mui-btn mui-btn-danger mui-btn-blue" data-id='${v._id}'>删除</button>
							  <button type="button" class="mui-btn mui-btn-primary" data-id='${v._id}'>查看详情</button>&nbsp;&nbsp;
				  </div>
				  </div>`
	                }).join('')
	            }
	        });

	        mui("#group").on("tap", ".mui-btn-primary", function() {
	            var id = this.dataset.id;
	            location.href = 'detail.html?id=' + id;
	        });
	        //添加
	        btn.addEventListener('click', function() {
	            location.href = 'detail.html'
	        });
	        //删除
	        mui("#group").on("tap", ".mui-btn-danger", function() {
	            var id = this.dataset.id;
	            var btnArray = ['否', '是'];
	            mui.confirm('确认删除吗？', '删除', btnArray, function(e) {
	                if (e.index == 1) {
	                    mui.ajax('/api/del', {
	                        dataType: 'json',
	                        data: { id: id },
	                        type: 'get',
	                        success: function(data) {
	                            console.log(data);
	                            location.href = 'index.html'
	                        }
	                    })
	                } else {
	                    console.log('取消删除')
	                }
	            })


	        });
	    });
	})