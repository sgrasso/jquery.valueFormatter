ValueFormatter.js
=================

Simple input value formatter and masking jQuery plugin.

Usage
-----

Plugin masks an inputs value to either percent or currency.

<pre><code>$('input').valueFormatter('currency','$--.--');</code></pre>

First value past is the method to be called and second is the default initial value of the Input.

Customizing
-----------

Adding your own types of value masking is simple and straight forward. The following methods object contains formatting and masking options.
<code>	var methods = {
  		
		percent: function(){
			return this
			  .focus(function(){
				initialValue(this,this.value);
				if (this.value == initialValue(this)) {
				  this.value = '';
				}
			  })
			  .blur(function(){
				initialValue(this,this.value)
				if (this.value == '') {
				  this.value = initialValue(this);
				}			
				if (validateInput(this.value) != '') {
						this.value = '--%';
					}
					else {
						$(this).val(function(index, old){
							return old.replace(/[^0-9\.]/g, '') + '%';
						});
					}
				});
			},

		currency: function(){
			return this
			  .focus(function(){
			  initialValue(this,this.value);
				if (this.value == initialValue(this)) {
				  this.value = '';
				}
			  })
			  .blur(function(){
				initialValue(this,this.value);
				if (this.value == '') {
				  this.value = initialValue(this);
				}				
				if (validateInput(this.value) != '') {
					this.value = '$--.--';
					return
				}
				if ($(this).val().indexOf('.') === -1) {
					this.value = '$' + this.value + '.00';
				}
					else {
						this.value = '$' + this.value;
						}
				});
			}
		}
</code>

When in need of a different format or masking simply add another method to the object.

<pre><code>
	newMethod: function(){
			return this
			  .focus(function(){
				/*Some Code*/
			  })
			  .blur(function(){
				/*Some Code*/
				});
			}
</code></pre>

Than Use your new formatter method.

<code>$('input').valueFormatter('yourNewMethod','yourNewMask');</code>
