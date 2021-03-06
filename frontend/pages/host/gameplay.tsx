import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import DefaultLayout from '../../layouts/Default';
import { useRouter } from 'next/router';
import { useAuth } from 'hooks/auth';
import HostWait from '../../components/HostGamePlay/wait';
import HostGame from '../../components/HostGamePlay/game';
import HostScore from '../../components/HostGamePlay/score';
import { useRootStore } from '../../stores/stores';
import { observer } from 'mobx-react-lite';
import { Col, Row, Container } from 'react-bootstrap';
import { toJS } from 'mobx';

const tempQuiz = {
    id: 0,
    title: 'asdf',
    owner: 'asdfghj',
    isPublished: true,
    color: 0,
    count: 4,
    createdAt: '2/2/2',
    updatedAt: null,
    question: [
        {
            id: 0,
            question: 'asadaasddddd',
            count: 3,
            choices: [
                { id: 0, choice: 'abc', isCorrect: false },
                { id: 1, choice: 'bcd', isCorrect: false },
                { id: 2, choice: 'cde', isCorrect: false },
                { id: 3, choice: 'def', isCorrect: true },
            ],
        },
        {
            id: 1,
            question: 'asadaasddddd',
            count: 3,
            choices: [
                { id: 0, choice: '123', isCorrect: false },
                { id: 1, choice: '234', isCorrect: true },
                { id: 2, choice: '567', isCorrect: false },
                { id: 3, choice: '987', isCorrect: false },
            ],
        },
        {
            id: 2,
            question: 'asadaasddddd',
            count: 3,
            choices: [
                { id: 0, choice: 'ฟหก', isCorrect: true },
                { id: 1, choice: 'ๆไำ', isCorrect: false },
                { id: 2, choice: 'อออ', isCorrect: false },
                { id: 3, choice: '่าี', isCorrect: false },
            ],
        },
        {
            id: 3,
            question: 'asadaasddddd',
            count: 3,
            choices: [
                { id: 0, choice: 'ผู้', isCorrect: false },
                { id: 1, choice: 'ชาย', isCorrect: false },
                { id: 2, choice: 'หญิง', isCorrect: true },
            ],
        },
    ],
};

export const HostGameplay = observer((props) => {
    const router = useRouter();
    const HostStore = useRootStore().hostStore;
    const { user } = useAuth();
    const [page, setPage] = useState(0);
    const WebSocketStore = useRootStore().webSocketStore;

    useEffect(() => {
        setPage(HostStore.page);
        console.log(page);
        console.log(HostStore.page);
    }, [HostStore.page]);

    const showStore = () => {
        console.log(toJS(HostStore.people));
        console.log(toJS(HostStore.questionState));
        console.log(toJS(HostStore.questionChoices));
    };
    return (
        <DefaultLayout>
            <Head>
                <title>Host Game Play</title>
            </Head>
            {HostStore.page == 0 && <HostWait />}
            {HostStore.page == 1 && <HostGame />}
            {HostStore.page == 2 && <HostScore />}
            <Row className="justify-content-center mb-4">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={showStore}>
                    show
                </button>
            </Row>
        </DefaultLayout>
    );
});

export default HostGameplay;
