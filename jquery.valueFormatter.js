/*jquery.valueFormatter-1.0.js
 *@Author: Sean Grasso
 *
 *Plugin masks an inputs value to either percent or currency.  
 *		$('input').valueFormatter('currency','$--.--');
 *First value past is the method to be called and second is the default initial value of the Input.
 *
 */

(function($){

    $.fn.initialValue = function(value) {
		if (value) {
		  return this.attr('inputValue', value);
		} else {
		  return this.attr('inputValue');
		}
	  };
	//Private Functions
	function validateInput(testValue){
			testValue = testValue.replace(/[\s]/g,"");
			testValue = testValue.replace(/[0-9]*\.?[0-9]{1,2}/,"");
			return testValue;
	}
	
   	var methods = {
  		
		percent: function(){
			return this
			  .focus(function(){
				$(this).initialValue(this.value);
				if (this.value == $(this).initialValue()) {
				  this.value = '';
				}
			  })
			  .blur(function(){
				$(this).initialValue(this.value);
				if (this.value == '') {
				  this.value = $(this).initialValue();
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
			  $(this).initialValue(this.value);
				if (this.value == $(this).initialValue()) {
				  this.value = '';
				}
			  })
			  .blur(function(){
			  $(this).initialValue(this.value);
				if (this.value == '') {
				  this.value = $(this).initialValue();
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
	
	$.fn.valueFormatter = function(method,initValue) {
			$(this).val(initValue);
			if ( methods[method] ) {
		      	return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		    } else if ( typeof method === 'object' || ! method ) {
		      	return methods.init.apply( this, arguments );
		    } else {
		      	$.error( 'Method ' +  method + ' does not exist on jQuery.valueFormat' );
		    }
  		};
  		
})( jQuery );