import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props) { 
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
 

export default function DraggableDialog(props) {

    const {title,contents,openFlag}=props
    const [open, setOpen] = React.useState(openFlag);
     
   

  const handleClose = (val) => {
    setOpen(false);
    if(val===true)
      props.setFlag(true) 
  };

  return (
    <div> 
      <Dialog
        open={open}
        onClose={()=>{handleClose(false)}}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {contents}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>{handleClose(false)}}>
            CANCEL
          </Button>
          <Button onClick={()=>{handleClose(true)}}>YES</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

