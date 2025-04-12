import React, { useEffect, useRef, useState } from "react";
import * as Blockly from "blockly/core";
import "blockly/blocks";
import "blockly/javascript";
import "blockly/msg/en";

const BlocklyEditor = () => {
  const blocklyDiv = useRef(null);
  const toolbox = useRef(null);
  const [workspace, setWorkspace] = useState(null);

    // New Block Definition
    const definitions = Blockly.createBlockDefinitionsFromJsonArray([
        {
        // The type is like the "class name" for your block. It is used to construct
        // new instances. E.g. in the toolbox.
        type: 'my_custom_block',
        // The message defines the basic text of your block, and where inputs or
        // fields will be inserted.
        message0: 'move forward %1',
        args0: [
            // Each arg is associated with a %# in the message.
            // This one gets substituted for %1.
            {
            // The type specifies the kind of input or field to be inserted.
            type: 'field_number',
            // The name allows you to reference the field and get its value.
            name: 'FIELD_NAME',
            }
        ],
        // Adds an untyped previous connection to the top of the block.
        previousStatement: null,
        // Adds an untyped next connection to the bottom of the block.
        nextStatement: null,
        }
    ]);
    
    // Register the definition.
    Blockly.defineBlocks(definitions);
  useEffect(() => {
    if (!workspace) {
      const injected = Blockly.inject(blocklyDiv.current, {
        toolbox: toolbox.current,
      });
      setWorkspace(injected);
    }

    // OPTIONAL: Cleanup on unmount
    return () => {
      if (workspace) {
        workspace.dispose();
      }
    };
  }, [workspace]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        ref={blocklyDiv}
        style={{ height: "600px", width: "100%" }}
        id="blocklyDiv"
      ></div>

      <xml
        xmlns="https://developers.google.com/blockly/xml"
        ref={toolbox}
        style={{ display: "none" }}
      >
        <category name="Logic" colour="%{BKY_LOGIC_HUE}">
          <block type="controls_if"></block>
          <block type="logic_compare"></block>
        </category>
        <category name="Loops" colour="%{BKY_LOOPS_HUE}">
          <block type="controls_repeat_ext"></block>
        </category>
        <category name="Math" colour="%{BKY_MATH_HUE}">
          <block type="math_number">
            <field name="NUM">123</field>
          </block>
          <block type="math_arithmetic"></block>
        </category>
      </xml>
    </div>
  );
};

export default BlocklyEditor;
