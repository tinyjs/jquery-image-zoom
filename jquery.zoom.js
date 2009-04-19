jQuery.fn.extend({
  zoom: function(params){
    var jQ = jQuery;
		var zoom_str = "";	
		if(!params || !params['zoom_images']){return false;}
    return this.each(function(){
			var container = this;
			var zoom_images = params['zoom_images'];
			/*if the zoom ul doesnt exist, then add it*/
			if(!jQ('#'+this.id+' .zoom_control').length){			
				zoom_str = '<ul class="zoom_control"><li class="zoom_plus"><a href="#" class="plus"><span>&nbsp;</span></a></li>';
				for (pos=zoom_images.length; pos>0; pos=pos-1){
					zoom_str += "<li class='zoom_"+pos;
					if(pos == 1){zoom_str += " current_zoom";}
					zoom_str  += "'><a href='#' class='zoom_level'  rel='zoom_"+pos+"'><span>&nbsp;</span></a></li>";
				}
				zoom_str +='<li class="zoom_minus"><a href="#" class="minus"><span>&nbsp;</span></a></li></ul>';
				jQ(this).html(zoom_str);
			}			
      jQ(this).find(' li a').click(function(){
				current = parseInt($('#'+container.id + ' li.current_zoom a').attr('rel').replace('zoom_', ""));
				$('#'+container.id +' li').removeClass('current_zoom');
				if($(this).attr('class') == "minus" && current>1){
					current--;
				}else if($(this).attr('class') == "plus" && current < zoom_images.length){
					current++;
				}else if($(this).attr('class') == "zoom_level"){
					current = parseInt($(this).parent().attr('class').replace('zoom_', ""));
				}
				$('#'+container.id +' li.zoom_'+current).addClass('current_zoom');
				if(params && params['target_div']){
					$('#'+params['target_div']).css('background-image', "url('"+zoom_images[current-1]+"')");
				}else{
					$('#'+container.id).parent().css('background-image', "url('"+zoom_images[current-1]+"')");
				}
				return false;
      });
    });
  }
});