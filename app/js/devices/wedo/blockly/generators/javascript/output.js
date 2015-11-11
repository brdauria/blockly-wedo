define(["../javascript"],function(generators){

  generators['wedo_turn_on'] = function(block) {
    var dropdown_type = block.getFieldValue('type');
    var dropdown_slot = block.getFieldValue('slot');
    var code = 'wedo.setAt(\'' + dropdown_type + '\', \'' + dropdown_slot + '\', true)'
    return generators.wrap(block, code);
  };
  generators['wedo_turn_off'] = function(block) {
    var dropdown_type = block.getFieldValue('type');
    var dropdown_slot = block.getFieldValue('slot');
    var code = 'wedo.setAt(\'' + dropdown_type + '\', \'' + dropdown_slot + '\', false)'
    return generators.wrap(block, code);
  };
  generators['wedo_turn_on_for'] = function(block) {
    var dropdown_type = block.getFieldValue('type');
    var dropdown_slot = block.getFieldValue('slot');
    var text_time = generators.valueToCode(block, 'time', generators.ORDER_ATOMIC);
    var code = 'wedo.setAt(\'' + dropdown_type + '\', \'' + dropdown_slot + '\', true);\n';
    code += 'wait.for(' + text_time + ');\n';
    code += 'wedo.setAt(\'' + dropdown_type + '\', \'' + dropdown_slot + '\', false)'
    return generators.wrap(block, code);
  };
  generators['wedo_power'] = function(block) {
    var dropdown_type = block.getFieldValue('type');
    var dropdown_slot = block.getFieldValue('slot');
    var text_power = generators.valueToCode(block, 'power', generators.ORDER_ATOMIC);
    var code = 'wedo.power(\'' + dropdown_type + '\', \'' + dropdown_slot + '\', ' + text_power + ')'
    return generators.wrap(block, code);
  };
  generators['wedo_motor_direction'] = function(block) {
    var dropdown_slot = block.getFieldValue('slot');
    var dropdown_direction = block.getFieldValue('direction');
    var code = 'wedo.direction(\'' + dropdown_slot + '\', \'' + dropdown_direction + '\')'
    return generators.wrap(block, code);
  };

});
