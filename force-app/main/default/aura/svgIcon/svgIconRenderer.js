({
  render: function(component, helper) {
      var ret = this.superRender();
    //grab attributes from the component markup
    var classname = component.get("v.class");
    var xlinkhref = component.get("v.xlinkHref"); 
    var ariaHidden = component.get("v.ariaHidden");
	var colorCode = component.get("v.colorCode");  
    
    //return an svg element w/ the attributes
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('class', classname);
    if(!$A.util.isEmpty(colorCode))
    	svg.style.backgroundColor = '#'+colorCode;
    svg.setAttribute('aria-hidden', ariaHidden);
    svg.innerHTML = '<use xlink:href="'+xlinkhref+'"></use>';
    return svg;
  },
    rerender : function(cmp, helper){
    this.superRerender();
    // do custom rerendering here
}
})