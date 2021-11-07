import * as React from 'react';
import { isPlainObject, get as loGet } from 'lodash';
import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    Typography,
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
} from '@material-ui/core';

export default function ExpandActivityBlock({ id, record, resource, ...rest }) {
    const { properties, description, created_at } = record;
    console.log('properties', properties);
    return (
        <Card>
            <CardHeader title={description} />
            <CardContent>
                {isPlainObject(properties) && (
                    <div>
                        <Typography gutterBottom>Затронутые поля:</Typography>
                        <Table>
                            <TableHead>
                                <TableCell>Поле</TableCell>
                                <TableCell>Было</TableCell>
                                <TableCell>Стало</TableCell>
                            </TableHead>
                            <TableBody>
                                {Object.keys(properties.attributes).map((key, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{key}</TableCell>
                                        <TableCell>{loGet(properties, `old.${key}`, '<Пусто>')}</TableCell>
                                        <TableCell>{properties.attributes[key]}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
