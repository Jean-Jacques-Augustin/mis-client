import React from 'react';
import {Button, ButtonGroup} from '@mui/material';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {FormattedMessage} from 'react-intl';

const StyledButtonGroup = styled(ButtonGroup)`
  border-radius: 8px;
`;

const StyledButton = styled(Button)<{ color?: string }>`
  min-height: 36px;
  border-radius: 18px;
  text-transform: none;
  transition: background-color 0.2s;
`;

interface Element {
	name: string;
	description: string;
}

interface Actions {
	onEdit: (dessert: Element) => void;
	onDelete: (dessert: Element) => void;
}

interface Props {
	element: Element;
	actions: Actions;
	color?: string;
}

const CrudButton: React.FC<Props> = ({element, actions, color}) => {
	const handleEdit = () => {
		actions.onEdit(element);
	};

	const handleDelete = () => {
		actions.onDelete(element);
	};

	return (
		<StyledButtonGroup>
			<StyledButton color={'primary'} startIcon={<EditIcon/>} onClick={handleEdit}>
				<FormattedMessage id="edit"/>
			</StyledButton>
			<StyledButton color={'secondary'} startIcon={<DeleteIcon/>} onClick={handleDelete}>
				<FormattedMessage id="delete"/>
			</StyledButton>
		</StyledButtonGroup>
	);
};

export default CrudButton;
