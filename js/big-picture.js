import { isEscKeyDown } from './util.js';

const NUMBER_COMMENTS_DISPLAED = 5;
const avatarProperties = {
  HEIGHT: 35,
  WIDTH: 35,
};


const bigPicture = document.querySelector('.big-picture');
const comments = bigPicture.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');
const socialCommentsCount = document.querySelector('.social__comment-count');
const socialCommentShowCount = bigPicture.querySelector('.social__comment-shown-count');
const socialCommentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const socialComment = bigPicture.querySelector('.social__comment');
const buttonClose = bigPicture.querySelector('.big-picture__cancel');

let visibleComments = [];
let commentsShow = NUMBER_COMMENTS_DISPLAED;

const createComment = (comment, template) => {
  const newComment = template.cloneNode(true);

  const avatar = newComment.querySelector('img');
  const text = newComment.querySelector('p');

  avatar.src = comment.avatar;
  avatar.alt = comment.name;
  text.textContent = comment.message;
  avatar.HEIGHT = avatarProperties.HEIGHT;
  avatar.WIDTH = avatarProperties.WIDTH;

  return newComment;
};

const showComments = () => {
  const addedComments = visibleComments.slice(0, commentsShow);
  comments.innerHTML = '';

  if (commentsShow >= visibleComments.length) {
    commentsLoader.classList.add('hidden');
    commentsShow = visibleComments.length;
  } else if (visibleComments.length <= NUMBER_COMMENTS_DISPLAED) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  socialCommentShowCount.textContent = commentsShow;
  socialCommentTotalCount.textContent = visibleComments.length;

  addedComments.forEach((comment) => {
    comments.appendChild(createComment(comment, socialComment));
  });
};

const onCommentsLoaderClick = () => {
  commentsShow += NUMBER_COMMENTS_DISPLAED;
  showComments();
};

const onButtonClose = () => {
  visibleComments = [];
  commentsShow = NUMBER_COMMENTS_DISPLAED;
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsLoader.removeEventListener('keydown', onCommentsLoaderClick);
};

function onEscKeyDown(evt) {
  if (isEscKeyDown(evt)) {
    evt.preventDefault();
    onButtonClose();
  }
}

const onPictureOpen = (photo) => {

  bigPicture.classList.remove('hidden');
  socialCommentsCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  visibleComments = photo.comments;
  showComments();

  document.addEventListener('keydown', onEscKeyDown);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
  buttonClose.addEventListener('click', onButtonClose);

};

export { onPictureOpen };
