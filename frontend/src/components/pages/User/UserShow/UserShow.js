import * as React from 'react';
import { Show, SimpleShowLayout, TextField, EmailField, TabbedShowLayout, Tab } from 'react-admin';
import { ShowSplitter } from '@app-universal';
import AvatarShowField from './AvatarShowField';

export default function UserShow(props) {
    return (
        <Show {...props}>
            <ShowSplitter
                leftSide={
                    <SimpleShowLayout>
                        <AvatarShowField />
                        <TextField label="ФИО" source="full_name" />
                        <EmailField label="Email" source="email" />
                        <TextField label="Телефон" source="phone" />
                        <TextField label="Роль" source="role.name" />
                    </SimpleShowLayout>
                }
                rightSide={
                    <TabbedShowLayout>
                        <Tab label="Заказы">
                            <TextField source="description" />
                        </Tab>
                        <Tab label="Комментарии">
                            <TextField source="description" />
                        </Tab>
                    </TabbedShowLayout>
                }
            />
        </Show>
    );
}
