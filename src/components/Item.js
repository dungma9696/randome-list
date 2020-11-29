import React from 'react';
import PropTypes from 'prop-types';

export const Item = props => {
    const { item} = props;

    return (
        <li id={item.id} className="flex justify-between m-5">
            <img src={item.url} alt="avatar" className="h-8" />
            <span className="flex-1 ml-1">{item.name}</span>
            <span className="item__count">{item.count}</span>
        </li>
    );
};

Item.propTypes = {

};

