import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'

const Deploy = ({deployData}) => {
    let pages = []
    // TODO loop through multiple pages, if present
    pages.push(<ReactMarkdown>{deployData}</ReactMarkdown>)
    return pages
}

export default Deploy