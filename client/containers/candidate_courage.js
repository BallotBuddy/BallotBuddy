import React, { Component } from 'react';
import  { connect } from 'react-redux';
import { fetchCourageScore } from '../actions/index';

class CandidateCourage extends Component {

  componentWillMount() {
    this.props.fetchCourageScore(this.props.id);
  }

  renderCandidateCourage() {
    if (this.props.courage.length === 0) {
      return <div>Loading...</div>
    }
    const response = this.props.courage;
    const questions = response.section;
    // remove the <br> tags in the survey message;
    let surveyMessage = response.surveyMessage;
      surveyMessage = surveyMessage.split('<');
      surveyMessage = surveyMessage[0];

    if (!questions) {
      return <div className="courage-topic">{surveyMessage}</div>
    }
      return questions.map((topic) => {
        return (() => {
            switch( topic.name ) {
              case "Abortion":
                return (
                  <div className='courage-topic' key={topic.name}>Abortion
                  { topic.row.map((position) => {
                    return (
                      <div className="topic-questions" key={position.path}>
                        <div className="topic-question">{position.rowText}</div>
                        <div className="question-response">{position.optionText}</div>
                        <div className="question-response">{position.answerText}</div>
                      </div>
                    );
                  })
                  }
                  </div>
                )
              case "Environment":
                return (
                  <div className='courage-topic' key={topic.name}>Environment
                  { topic.row.map((position) => {
                    return (
                      <div className="topic-questions" key={position.path}>
                        <div className="topic-question">{position.rowText}</div>
                        <div className="question-response">{position.optionText}</div>
                        <div className="question-response">{position.answerText}</div>
                      </div>
                    );
                  })
                  }
                  </div>
                )
              case "Health Care":
                return (
                  <div className='courage-topic' key={topic.name}>Health Care
                  { topic.row.map((position) => {
                    return (
                      <div className="topic-questions" key={position.path}>
                        <div className="topic-question">{position.rowText}</div>
                        <div className="question-response">{position.optionText}</div>
                        <div className="question-response">{position.answerText}</div>
                      </div>
                    );
                  })
                  }
                  </div>
                )
              case "Guns":
                return (
                  <div className='courage-topic' key={topic.name}>Guns
                  { topic.row.map((position) => {
                    return (
                      <div className="topic-questions" key={position.path}>
                        <div className="topic-question">{position.rowText}</div>
                        <div className="question-response">{position.optionText}</div>
                        <div className="question-response">{position.answerText}</div>
                      </div>
                    );
                  })
                  }
                  </div>
                )
              case "Immigration":
                return (
                  <div className='courage-topic' key={topic.name}>Immigration
                  { topic.row.map((position) => {
                    return (
                      <div className="topic-questions" key={position.path}>
                        <div className="topic-question">{position.rowText}</div>
                        <div className="question-response">{position.optionText}</div>
                        <div className="question-response">{position.answerText}</div>
                      </div>
                    );
                  })
                  }
                  </div>
                )
              default:
                return
            }
        })()
      });
  }

  render(){
    const { courage } = this.props;
    if (!courage) {
      return (
        <div>Loading...</div>
      );
    }
    return (
      <div className="candidate-courage-container">
        <div className="candidate-experience-title">Key Issues</div>
        <div className="experience-title-line"></div>
        {this.renderCandidateCourage()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    courage: state.profiles.courage
  }
}

export default connect(mapStateToProps, { fetchCourageScore })(CandidateCourage);
