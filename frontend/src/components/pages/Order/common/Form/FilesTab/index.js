import * as React from 'react';
import { ImageInput, ImageField } from 'react-admin';

export default function FilesTab(props) {
    return (
        <>
            <ImageInput
                source="order_photos"
                label="Фото к заказу"
                accept="image/*"
                placeholder={<p>Прикрепите фото здесь</p>}
                multiple
            >
                <ImageField source="src" title="title" />
            </ImageInput>
        </>
    );
}
