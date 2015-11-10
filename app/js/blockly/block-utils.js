define([
  "../lang"
],function(lang){

  function canSetWarning(block) {
    return block.workspace && Blockly.dragMode_ != 2;
  }

  function onchange() {
    var block = this;
    if (!canSetWarning(block)) return;
    var missing = block.inputList.some(function(input){
      if (input.type != Blockly.DUMMY_INPUT)
      {
        var target = block.getInputTargetBlock(input.name);
        if (!target)
        {
          block.setWarningText(lang.ui.get("MISSING_BLOCKS"));
          return true;
        }
      }
    });
    if (!missing) block.setWarningText(null);
  }

  var self = {};

  self.setupBlock = function(block) {
    block.onchange = onchange;
  }

  return self;

});
