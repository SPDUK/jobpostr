'use strict'

const Job = use('App/Models/Job')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with jobs
 */
class JobController {
  /**
   * Show a list of all jobs.
   * GET jobs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async home ({ request, response, view }) {
    // Create a job
    // const job = new Job()
    // job.title = 'My job title'
    // job.link = 'http://google.com'
    // job.description = 'My job description'
    // await job.save()

    // Fetch a job
    const jobs = await Job.all()

    return view.render('index', { jobs: jobs.toJSON() })
  }

  async userIndex ({ view, auth }) {
    // Fetch all user's jobs
    const jobs = await auth.user.jobs().fetch()
    console.log(jobs)

    return view.render('jobs', { jobs: jobs.toJSON() })
  }

  /**
   * Render a form to be used for creating a new job.
   * GET jobs/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async create ({ auth, session, request, response }) {
    const job = request.all()

    await auth.user.jobs().create({
      title: job.title,
      link: job.link,
      description: job.description
    })

    session.flash({ message: 'Your job has been posted!' })
    return response.redirect('back')
  }

  /**
   * Create/save a new job.
   * POST jobs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single job.
   * GET jobs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing job.
   * GET jobs/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    const job = await Job.find(params.id)
    return view.render('edit', { job: job })
  }

  /**
   * Update job details.
   * PUT or PATCH jobs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const job = await Job.find(params.id)

    job.title = request.all().title
    job.link = request.all().link
    job.description = request.all().description

    await job.save()

    session.flash({ message: 'Your job has been updated. ' })
    return response.redirect('/post-a-job')
  }

  /**
   * Delete a job with id.
   * DELETE jobs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ session, params, request, response }) {
    const job = await Job.find(params.id)

    await job.delete()
    session.flash({ message: 'Your job has been removed' })
    return response.redirect('back')
  }
}

module.exports = JobController
