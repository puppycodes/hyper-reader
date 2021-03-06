import { Tool } from 'substance'

/**
  Simple comment editor, based on a regular
  input field. Changes are saved when the input
  field is blurred.
*/
class EditCommentTool extends Tool {
  // getUrlPath () {
  //   let propPath = this.constructor.urlPropertyPath
  //   return [this.getNodeId()].concat(propPath)
  // }

  getNodeId () {
    return this.props.commandState.nodeId
  }

  render ($$) {
    let Input = this.getComponent('input')
    let Button = this.getComponent('button')
    let el = $$('div').addClass('sc-edit-comment-tool')
    console.log('Edit', this.props)
    el.append(
      $$(Input, {
        type: 'text',
        path: [this.getNodeId(), 'content'],
        placeholder: 'Please enter comment here'
      }),
      $$(Button, {
        icon: 'delete',
        style: this.props.style
      }).on('click', this.onDelete)
    )
    return el
  }

  onDelete (e) {
    e.preventDefault()
    let nodeId = this.getNodeId()
    let sm = this.context.surfaceManager
    let surface = sm.getFocusedSurface()
    if (!surface) {
      console.warn('No focused surface. Stopping command execution.')
      return
    }
    let editorSession = this.context.editorSession
    editorSession.transaction(function (tx, args) {
      tx.delete(nodeId)
      return args
    })
  }
}

export default EditCommentTool
